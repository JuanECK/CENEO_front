import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api, logoutSession } from '../services/api';
// import { ModalAgregarCentroNegocios } from '../modals/ModalGeneral';

interface InputCentroN{
  correoTitular:string;
  idCentroN:number | null;
  nombreCentro:string;
  nombreTitular:string;
  porcentaje:number | null;
  telefonoTitular:string
}
interface datosHijos{
  centroActivo:string;
  centroId: string;
  accion: boolean;
}
// interface cNegocio{
//   Perfil:string;
//   centroNegocio:string;
//   idCentroN:number;
//   idUsuario:number;
// }


export const AdminLayout: React.FC = () => {

    const [showModalAgregaCentroNegocio, setShowModalAgregaCentroNegocio] = useState(false);
    const [showModalEditaCentroNegocio, setShowModalEditaCentroNegocio] = useState(false);
    const [centroActivo, setCentroActivo] = useState('');
    const [centroId, setCentroId] = useState(1);
    const [idUsuario, setIdUsuario] = useState<string | null>(null);
    const [cNegocio, setCNegocio] = useState<any[]>([]);
    // const [cNegocio, setCNegocio] = useState<cNegocio>();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const [datosHijo, setDatosHijo] = useState<datosHijos>();
    const [datosHijoActivo, setDatosHijoActivo] = useState<any[]>([]);


    const [dataInputs, getDataInput] = useState<InputCentroN>({

      correoTitular:"",
      idCentroN:null,
      nombreCentro:"",
      nombreTitular:"",
      porcentaje:null,
      telefonoTitular:"",

    
  });

    // const navigate = useNavigate();
    // const location = useLocation(); // Sabe en qué URL estamos para pintar el botón activo

    
    const cargaCentroNegocios = async () => {
  
      // const { idUsuario } = user!
      // setIdUsuario(idUsuario)
      // const response = await api.post("/admin/centroNegocios", { idUsuario });

      // if( response.data.status === 200 ){
      //   setCNegocio(response.data.data.cNegocios)
      //   setDatosHijoActivo(response.data.data.cNegocios)
      //   if(centroActivo === ''){
      //     setCentroActivo(response.data.data.cNegocios[0]?.centroNegocio)
      //   }
      // }

    }

    const editaCentroN = async() => {
      setIsLoading(true)
      try {
        
        const response = await api.post("/admin/editaCentroNegocio", { data:{idCentroN:centroId} });
        // console.log(response)
        if( response.data.status === 200){
          setShowModalEditaCentroNegocio(true)
          getDataInput(response.data.data.resultado)
        }

      } catch {
        
      }finally{
        setIsLoading(false)
      }
    }

    useEffect(()=>{
      cargaCentroNegocios()
      // setIdUsuario(user?.idUsuario)
      // console.log(user)
    },[])

    useEffect(()=>{
      // console.log(JSON.stringify(datosHijo))

      if(datosHijo?.accion === false ){
          setCNegocio(datosHijoActivo)
      }
      else if ( datosHijo?.accion === true ){
        const data = [{
          centroNegocio:datosHijo.centroActivo,
          idCentroN:datosHijo.centroId,
          
        }]
        setCNegocio(data)
      }


    },[datosHijo])

  const handleCloseModal = (resultado: '1' | '0') => {
    setShowModalAgregaCentroNegocio(false); // Cerramos el modal

    // 3. Si se cumple la condición del "ok", se ejecuta la API aquí mismo
    if (resultado === '1') {
      cargaCentroNegocios();
      // console.log('actualizamos centro de negocios')
    }
    
  };
  const handleCloseModalEdicion = (resultado: '1' | '0', centroN:string) => {
    setShowModalEditaCentroNegocio(false); // Cerramos el modal

    // 3. Si se cumple la condición del "ok", se ejecuta la API aquí mismo
    if (resultado === '1') {
      cargaCentroNegocios();
      setCentroActivo(centroN)
      // console.log('actualizamos centro de negocios')
    }
    
  };

const creaUser = async () => {
  const data:any[] = [{
  email: "carlos_villagran@gmail.com",
  password: "Admin123!",
  nombre_admin: "JUAN VILLAGRAN",
  tarjeta_eje: "4830520000000001",
  clabe_eje: "646180670000000001",
  identificador: "ONCECAPITAL",
  nombre_cn: "EnriqueSegoviano",
  cn: "100010"
}]
  const response = await api.post("/newUser", { data:data });
        console.log(response)
}

const resetPass = async () => {
  const data:any[] = [{
  re_password: "Admin1234!",
  tarjeta_eje:"4830520000000001",
  cn: "100020"
}]
  const response = await api.post("/resetPassword", { data:data });
        console.log(response)
}

const createCustomer = async () => {
  const data:any[] = [{
  clabe_cliente: "646180670010100099",
  tarjeta_cliente: "4830520060126493",
  nombre_cliente: "EUROPA  X1 X2",
  cn: "100010"
}]
  const response = await api.post("/createCustomer", { data:data });
        console.log(response)
}

const deleteCustomer = async () => {
  const data:any[] = [{
  tarjeta_cliente: "4830520000000001",
  cn: "100020"
}]
  const response = await api.post("/deleteCustomer", { data:data });
        console.log(response)
}
const endSess = async () => {
  logoutSession(1)
}

//   const handleLogout = async () => {
//     await logoutSession();
//     logout();
//     navigate('/', { replace: true });
//   };

  return (
  <div className="admin-wrapper">
    <div className="dashboard-layout">
      {isLoading && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="flex-1 flex items-center justify-center">
            <span className="spinner" />
          </div>
        </div>
      )}

        {/* 📁 BARRA LATERAL IZQUIERDA (Centros de Negocio) */}
        <aside className="sidebar-panel">
          <div>
            <div className="flex items-center justify-center gap-2 mb-6 px-2 mt-6 ">
              <svg width="90" height="29" viewBox="0 0 90 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_26_350)">
                <path d="M40.7577 0.730978C39.9256 0.252768 38.9981 0 38.0705 0C37.143 0 36.195 0.245936 35.3493 0.737809C33.726 1.72839 32.7576 3.44311 32.7576 5.32862V23.6714C32.7576 25.5432 33.7533 27.2921 35.3493 28.228C36.1745 28.7404 37.0952 28.9932 38.0774 28.9932C39.0595 28.9932 39.9598 28.7267 40.7645 28.228C42.3878 27.2716 43.3903 25.5227 43.3903 23.6645V21.3281H40.0552V23.6645C40.0552 24.7439 39.1481 25.6525 38.0705 25.6525C36.9929 25.6525 36.0586 24.7576 36.0586 23.6645V5.32862C36.0586 4.23557 36.9588 3.34064 38.0705 3.34064C39.1822 3.34064 40.0552 4.23557 40.0552 5.32862V7.66502H43.3903V5.32862C43.3903 3.45677 42.4082 1.74205 40.7577 0.737809V0.730978Z" fill="white"/>
                <path d="M44.4065 29H55.0393V25.6594H47.7416V21.2667H53.7298V17.926H47.7416V3.34064H55.0393V0H44.4065V29Z" fill="white"/>
                <path d="M64.0897 0.730978C63.2508 0.245936 62.3369 0 61.3752 0C60.4136 0 59.5201 0.252768 58.6812 0.737809C57.0376 1.73522 56.0623 3.44994 56.0623 5.32862V29H59.3974V5.32862C59.3974 4.24923 60.3045 3.34064 61.3821 3.34064C62.4597 3.34064 63.394 4.23557 63.394 5.32862V29H66.7018V5.32862C66.7018 3.44311 65.7334 1.72839 64.0965 0.737809L64.0897 0.730978Z" fill="white"/>
                <path d="M67.7114 29H78.3442V25.6594H71.0397V21.2667H77.0347V17.926H71.0397V3.34064H78.3442V0H67.7114V29Z" fill="white"/>
                <path d="M84.6801 0C81.7474 0 79.3604 2.39105 79.3604 5.32862V23.6714C79.3604 26.5611 81.7952 29 84.6801 29C87.5651 29 89.9999 26.609 89.9999 23.6714V5.32862C89.9999 2.39105 87.6129 0 84.6801 0ZM82.6955 5.32862C82.6955 4.23557 83.5889 3.34064 84.6801 3.34064C85.7714 3.34064 86.6921 4.23557 86.6921 5.32862V23.6714C86.6921 24.7644 85.7918 25.6594 84.6801 25.6594C83.5684 25.6594 82.6955 24.7508 82.6955 23.6714V5.32862Z" fill="white"/>
                <path d="M0 21.8747H19.0694C19.54 21.8747 19.8878 21.7585 20.1266 21.5331C20.3653 21.3008 20.4812 20.9387 20.4812 20.4469V12.1943H0V21.8747ZM13.5109 15.6716C13.7292 15.4598 14.0156 15.3505 14.3703 15.3505H17.3302C17.6849 15.3505 17.9714 15.4598 18.1896 15.6716C18.4078 15.8834 18.517 16.1635 18.517 16.5119V18.7526C18.517 19.0942 18.4078 19.3675 18.1896 19.5861C17.9714 19.8047 17.6849 19.914 17.3302 19.914H14.3703C14.0156 19.914 13.7292 19.8047 13.5109 19.5861C13.2927 19.3675 13.1835 19.0874 13.1835 18.7526V16.5119C13.1835 16.1635 13.2927 15.8834 13.5109 15.6716Z" fill="white"/>
                <path d="M20.4812 9.16757V8.45025C20.4812 7.95155 20.3653 7.58265 20.1266 7.3572C19.8878 7.12493 19.5332 7.01562 19.0694 7.01562H0V9.16757H20.4812Z" fill="white"/>
                <path d="M26.7422 0H2.20294C0.988936 0 0 0.990577 0 2.21343V3.66172H19.465C20.87 3.66172 21.9476 4.03746 22.6978 4.78893C23.448 5.5404 23.8299 6.61296 23.8299 8.0066V20.8841C23.8299 22.2914 23.4548 23.364 22.6978 24.1086C21.9476 24.8532 20.87 25.229 19.465 25.229H0V26.7866C0 28.0026 0.988936 28.9932 2.20294 28.9932H26.7422C27.9562 28.9932 28.9451 28.0026 28.9451 26.7866V2.21343C28.9451 0.990577 27.9562 0 26.7422 0Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_26_350">
                <rect width="90" height="29" fill="white"/>
                </clipPath>
                </defs>
              </svg>
              {/* <svg
                width="73"
                height="32"
                viewBox="0 0 73 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.1118 0H2.47181C1.10798 0 0 1.12259 0 2.5044V29.4936C0 30.8774 1.10798 31.998 2.47181 31.998H29.1098C30.4756 31.998 31.5816 30.8754 31.5816 29.4936V2.5044C31.5816 1.12055 30.4736 0 29.1098 0H29.1118ZM14.1963 28.3608L5.52783 21.5885L11.4263 16.9797L14.1963 19.1453V28.3628V28.3608ZM14.1963 12.8567L11.4263 15.0223L5.52783 10.4136L14.1963 3.64128V12.8588V12.8567ZM17.3893 28.3608V19.1433L20.1593 16.9777L26.0578 21.5864L17.3893 28.3587V28.3608ZM20.1593 15.0223L17.3893 12.8567V3.64128L26.0578 10.4136L20.1593 15.0223Z"
                  fill="white"
                />
                <path
                  d="M47.2948 3.51269C47.7722 3.51269 48.0442 3.75353 48.0442 4.23727V5.168C48.0442 5.65174 47.7722 5.92728 47.2948 5.92728H41.7106V14.7917H45.9995C46.4769 14.7917 46.7489 15.0325 46.7489 15.5163V16.447C46.7489 16.9307 46.4769 17.2063 45.9995 17.2063H41.7106V27.728C41.7106 28.2118 41.4386 28.4873 40.9612 28.4873H39.5993C39.1219 28.4873 38.8499 28.2118 38.8499 27.728V4.23727C38.8499 3.75353 39.1219 3.51269 39.5993 3.51269H47.2948Z"
                  fill="white"
                />
                <path
                  d="M56.6562 17.1042L60.5725 27.5219C60.7417 27.9362 60.5725 28.4526 59.9943 28.4873H58.4613C58.0523 28.4873 57.8146 28.3158 57.7119 27.9689L53.7634 17.4471H52.4358V27.728C52.4358 28.2118 52.1639 28.4873 51.6864 28.4873H50.3246C49.8472 28.4873 49.5752 28.2118 49.5752 27.728V4.23727C49.5752 3.75353 49.8472 3.51269 50.3246 3.51269H54.1381C58.5982 3.51269 59.7888 5.47824 59.7888 9.03176V11.9301C59.7888 14.6896 59.1422 16.4837 56.6562 17.1042ZM54.1381 15.0346C56.4528 15.0346 56.9645 13.8956 56.9645 11.9301V9.03176C56.9645 7.1009 56.4528 5.92728 54.1381 5.92728H52.4358V15.0346H54.1381Z"
                  fill="white"
                />
                <path
                  d="M72.2506 15.7938C72.7281 15.7938 73 16.0694 73 16.5531V23.5908C73 26.8667 71.8417 28.6608 67.7562 28.6608C63.6708 28.6608 62.5125 26.8667 62.5125 23.5908V8.41127C62.5125 5.13535 63.6708 3.34124 67.7562 3.34124C71.8417 3.34124 73 5.13535 73 8.41127V11.0667C73 11.5505 72.7281 11.826 72.2506 11.826H70.8888C70.4114 11.826 70.1394 11.5505 70.1394 11.0667V8.41127C70.1394 6.75596 69.6962 5.75583 67.7562 5.75583C65.8163 5.75583 65.3731 6.75596 65.3731 8.41127V23.5887C65.3731 25.244 65.8163 26.2442 67.7562 26.2442C69.6962 26.2442 70.1394 25.244 70.1394 23.5887V18.2064H68.3002C67.8227 18.2064 67.585 17.9656 67.585 17.4818V16.5511C67.585 16.0674 67.8227 15.7918 68.3002 15.7918H72.2486L72.2506 15.7938Z"
                  fill="white"
                />
                <defs>
                  <clipPath id="clip0_503_131">
                    <rect width="73" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg> */}
            </div>

            <div className="sidebar-title-btn">
              {/* <div className="bg-(--DeepBlue) py-2 px-5 rounded-full flex items-center gap-1.5 font-light tracking-wider text-[12px]">
                <span>Centros de Negocio</span>
              </div>
              <div className="bg-(--DeepBlue)  rounded-full">
                <button
                  type="button"
                  onClick={()=> setShowModalAgregaCentroNegocio(true)}
                  className="text-[15px] font-bold cursor-pointer py-1.5 px-3.5"
                >
                  +
                </button>
              </div> */}
              
            </div>

            <nav className="sidebar-menu-list">
                {/* <button type="button" className="sidebar-menu-item" onClick={creaUser} >crea usuario</button>
                <button type="button" className="sidebar-menu-item" onClick={resetPass} >Resetea pass</button>
                <button type="button" className="sidebar-menu-item" onClick={createCustomer} >crea Cliente</button>
                <button type="button" className="sidebar-menu-item" onClick={deleteCustomer} >elimina Cliente</button>
                <button type="button" className="sidebar-menu-item" onClick={endSess} >Salir</button> */}
                <label htmlFor="" className={`sidebar-menu-item active`}>{user?.nombreCentroNegocio}</label>
              {/* {cNegocio?.map((centro) => (
                <button
                  type="button"
                  key={centro.idCentroN}
                  onClick={() => {setCentroActivo(centro.centroNegocio); setCentroId(centro.idCentroN)}}
                  className={`sidebar-menu-item ${centroActivo === centro.centroNegocio ? "active" : ""}`}
                >
                  {centro.centroNegocio}
                </button>
              ))} */}
            </nav>
          </div>

         {/* { datosHijo?.accion === false && (

          <button
            type="button"
            onClick={editaCentroN}
            className="w-full text-center text-md font-bold text-(--GrisLight) hover:text-(--VerdeNeon) px-4 transition-colors cursor-pointer"
          >
            Editar
          </button>

         ) }      */}
        </aside>

          

      {/* 📊 PANEL OPERATIVO DINÁMICO */}
      <main className="main-content-panel">

        {/* <Outlet context={{ centroActivo, setCentroActivo }}/> */}
        <Outlet context={{ centroActivo, setCentroActivo, centroId, setCentroId, idUsuario, setIdUsuario, setDatosHijo, user }}/>
      </main>
      {/* {showModalAgregaCentroNegocio && (
        <ModalAgregarCentroNegocios
          title={'Agregar Centro de Negocios'}
          onCancel={()=> setShowModalAgregaCentroNegocio(false)}
          onClose={handleCloseModal}
        />
      )}
      {showModalEditaCentroNegocio && (
        <ModalAgregarCentroNegocios
          title={'Editar Centro de Negocios'}
          tipo={'edicion'}
          edicionModal={true}
          usuarioData={dataInputs}
          onCancel={()=> setShowModalAgregaCentroNegocio(false)}
          onClose={handleCloseModalEdicion}
        />
      )} */}
    </div>
  </div>
  );
};