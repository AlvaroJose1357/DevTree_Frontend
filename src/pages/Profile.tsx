export default function Profile() {
  return (
    <form className="space-y-5 rounded-lg bg-white p-10" onSubmit={() => {}}>
      <legend className="text-center text-2xl text-slate-800">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="rounded-lg border-none bg-slate-100 p-2"
          placeholder="handle o Nombre de Usuario"
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="rounded-lg border-none bg-slate-100 p-2"
          placeholder="Tu Descripción"
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="rounded-lg border-none bg-slate-100 p-2"
          accept="image/*" // Solo acepta archivos de imagen
          onChange={() => {}}
        />
      </div>

      <input
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-cyan-400 p-2 text-lg font-bold uppercase text-slate-600"
        value="Guardar Cambios"
      />
    </form>
  );
}
