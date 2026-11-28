import React, { useEffect, useState } from "react";
import { api } from "../services/api";

const formateadorMexicano = new Intl.NumberFormat('es-MX', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

interface ModalAbonoProps {
  title?: string;
  tarjetahabiente?: string;
  cta?: string;
  cn?: number | null;
  tarjeta_cliente?: string;
  onClose?: (resultado: "1" | "0") => void;
  icono?: React.ReactNode;
}
export const ModalAbono: React.FC<ModalAbonoProps> = ({
  icono,
  title,
  tarjetahabiente,
  cta,
  cn,
  tarjeta_cliente,
  onClose,
}) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [saldo, setSaldo] = useState<number>(0);
    const [saldoEje, setSaldoEje] = useState<number>(0);
    const [form, setForm] = useState({
      cn,
      tarjeta_cliente,
      monto:'' ,
  });

const [valorFormateado, setValorFormateado] = useState('');

const manejarInput  = (e:any) => {
  // 1. Dejar únicamente los dígitos numéricos
  const digitos = e.target.value.replace(/\D/g, '');

    // Si el usuario borra todo, limpiamos el estado
    if (!digitos || digitos == '00') {
      setValorFormateado('');
      setForm({ ...form, monto:''});
      return;
    }

    // 2. Convertir a formato flotante simulando centavos (ej: "150" -> 1.50)
    const numeroFloat = parseFloat(digitos) / 100;
    setForm({ ...form, monto:String(numeroFloat)});

    // 3. Formatear con las reglas de es-MX (miles con coma, centavos con punto)
    const resultado = formateadorMexicano.format(numeroFloat);
   setValorFormateado(resultado);
}

useEffect(() => {
  consultaSaldoEje()
}, []); // Escucha el cambio de datos

const consultaSaldoEje = async () => {
  console.log(cn)
  const response = await api.post('/modal/getCashMain',{data:{cn}})
  console.log(response)
  if (response.data.status !== 200) {}
  // setSaldoEje()
}

const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
try {

    // const response = await api.post("/admin/agregaAbonoGasto", { data:data});
    console.log(form)

    // const response = await api.post("/admin/agregaAbonoGastot", form );

    // // console.log(response.data)

    // if(response.data.status === 200){
    //   onClose!('1')
    //   return

    // }else{
    //   setErrorMessage(response.data.error.message);
    // }

    } catch {
      console.log("Error del servidor");
    }
  };

  const handledClosed = () => {
    onClose!("0");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 ">
      <div className="w-full max-w-md rounded-2xl bg-(--TextoInactivo) p-8 shadow-2xl text-center border border-[#146f8c] min-w-sm">
        <div className="flex items-center justify-between">
          {/* Renderizado condicional del icono dinámico */}
          <div className="flex">
            {icono && (
              <div className="flex items-center justify-center mb-4">
                {icono}
              </div>
            )}
            {/* Título Dinámico */}
            <h2 className="text-2xl font-semibold text-(--VerdeNeon) mb-4 ml-4">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onClose!("0")}
            className="mb-4 cursor-pointer"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.375 12.625C0.223958 12.474 0.122396 12.2969 0.0703125 12.0938C0.0234375 11.8854 0.0260417 11.6823 0.078125 11.4844C0.130208 11.2812 0.226562 11.1094 0.367188 10.9688L4.82812 6.5L0.367188 2.03906C0.226562 1.89844 0.130208 1.72656 0.078125 1.52344C0.03125 1.32031 0.03125 1.11719 0.078125 0.914062C0.130208 0.710938 0.229167 0.533854 0.375 0.382812C0.526042 0.226562 0.703125 0.125 0.90625 0.078125C1.11458 0.03125 1.32031 0.03125 1.52344 0.078125C1.72656 0.125 1.90104 0.221354 2.04688 0.367188L6.50781 4.82031L10.9609 0.367188C11.1068 0.221354 11.2812 0.125 11.4844 0.078125C11.6875 0.0260417 11.888 0.0260417 12.0859 0.078125C12.2891 0.130208 12.4688 0.231771 12.625 0.382812C12.776 0.533854 12.8776 0.710938 12.9297 0.914062C12.9818 1.11719 12.9818 1.32031 12.9297 1.52344C12.8828 1.72135 12.7865 1.89583 12.6406 2.04688L8.1875 6.5L12.6406 10.9609C12.7865 11.1068 12.8828 11.2812 12.9297 11.4844C12.9766 11.6875 12.974 11.8906 12.9219 12.0938C12.875 12.2969 12.776 12.474 12.625 12.625C12.474 12.776 12.2969 12.875 12.0938 12.9219C11.8906 12.974 11.6875 12.9766 11.4844 12.9297C11.2812 12.8828 11.1068 12.7839 10.9609 12.6328L6.50781 8.17969L2.04688 12.6406C1.90104 12.7812 1.72656 12.875 1.52344 12.9219C1.32552 12.974 1.1224 12.974 0.914062 12.9219C0.710938 12.875 0.53125 12.776 0.375 12.625Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col justify-start ">
          <div className="flex justify-start">
            <p className="  text-write  font-[200] text-[16px]">
              Tarjethabiente:{" "}
              <span className="font-bold ">{tarjetahabiente}</span>
            </p>
          </div>
          <div className="flex justify-start">
            <p className="text-sm  text-write  font-[200] text-[16px]">
              No. de tarjeta: <span className="font-bold ">{cta}</span>
            </p>
          </div>
          <div className="flex justify-start">
            <p className="text-sm  text-write  font-[200] text-[16px]">
              Saldo actual: <span className="font-bold ">{saldo}</span>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid  grid grid-cols-1 md:grid-cols-1 place-self-start gap-4 mt-4">
            <label htmlFor="">Abono</label>
          </div>
          <div className="grid  grid grid-cols-1 md:grid-cols-1 items-center gap-4 mt-1">
            <input
              type="text"
              name="valorFormateado"
              required
              autoComplete={"off"}
              value={valorFormateado || ""}
              onChange={manejarInput}
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  "Campo obligatorio.",
                )
              }
              onInput={(e) =>
                (e.target as HTMLInputElement).setCustomValidity("")
              }
              // onChange={handleFormChange}
              placeholder="*$0.00"
              className="input-generico w-full min-w-40"
            />
          </div>
          <div className="grid grid-cols-[50px_1fr] items-center gap-4 mt-1 mb-8">
            <div></div>
            <div className="place-self-end mr-2">
              <label htmlFor="" className="text-sm font-[200]">Saldo cuenta Eje: <strong className="font-[800]">${saldoEje}</strong></label>
            </div>
          </div>


          <div className="flex flex-row gap-3 mt-5 justify-end">
            {/* Botón Cancelar */}
            <button
              type="submit"
              className="w-[35%] py-2 px-2 rounded-full bg-(--DeepBlue) text-(--verdeSuccess) font-medium  focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              Agregar
            </button>

            {/* Botón Confirmar */}
            <button
              type="button"
              onClick={handledClosed}
              className="w-[35%] py-2 px-2 rounded-full bg-(--DeepBlue) text-(--rojoCancelar) font-medium  focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            >
              Cancelar
            </button>
          </div>

        </form>
      </div>
      {errorMessage && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-(--TextoInactivo) p-8 shadow-2xl text-center border border-[#146f8c]">
            <h2 className="text-2xl font-[200] text-white mb-4">
              {errorMessage}
            </h2>
            <button
              className="px-8 py-2.5 rounded-full bg-[#083543] text-emerald-400 font-medium hover:bg-[#05242e] transition-colors border border-cyan-800"
              onClick={() => setErrorMessage(null)}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};