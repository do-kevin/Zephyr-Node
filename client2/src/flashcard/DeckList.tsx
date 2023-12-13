interface Props {
  viewModel: Array<{
    id: number;
    subject: string;
  }>;
}

export const DeckList = (props: Props) => {
  return (
    <div className="d-flex flex-wrap gap-5 mb-5">
      {props.viewModel?.map((d) => {
        return (
          <article
            tabIndex={0}
            key={d.id}
            className="test-shadow-on-hover mx-50 col-12 col-md-6 col-lg-4 w-100 w-md-45 w-lg-30 flashcard-shadows"
            style={{
              borderRadius: 4,
            }}
          >
            <div className=" bg-white d-inline-block p-5 shadow-sm rounded w-100 h-100">
              <p className="text-center mb-0 py-5">{d.subject}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};
