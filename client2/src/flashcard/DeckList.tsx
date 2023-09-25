interface Props {
  viewModel: Array<{
    id: number;
    subject: string;
  }>;
}

export const DeckList = (props: Props) => {
  return (
    <div className="d-flex flex-wrap gap-3">
      {props.viewModel?.map((d) => {
        console.log("d: ", d);
        return (
          <article key={d.id} className="w-100 mx-50">
            <div className="bg-white d-inline-block p-5 shadow-sm rounded w-100">
              <p className="text-center">{d.subject}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};
