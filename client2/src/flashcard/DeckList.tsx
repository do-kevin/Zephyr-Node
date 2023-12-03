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
        return (
          <article
            key={d.id}
            className="mx-50 col-12 col-md-6 col-lg-4 w-100 w-md-45 w-lg-32"
          >
            <div className="bg-white d-inline-block p-5 shadow-sm rounded w-100 h-100">
              <p className="text-center mb-0 py-3">{d.subject}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};
