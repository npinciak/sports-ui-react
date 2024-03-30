export function HeaderComponent() {
  return (
    <div className="bg-slate-800">
      <div className="text-center">
        <button
          className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-slate-400 opacity-50 hover:opacity-100"
          type="button"
        >
          <i className="fas fa-bars"></i>
        </button>

        <span className="flex-auto">
          <h1>
            <span className="text-slate-400 opacity-50 hover:cursor-pointer hover:opacity-100">
              SportsUi
            </span>
          </h1>
        </span>

        <button
          className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-slate-400 opacity-50 hover:opacity-100"
          type="button"
        >
          <i className="fas fa-user"></i>
        </button>
      </div>
    </div>
  );
}
