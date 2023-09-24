interface Props {
  viewModel: Array<{
    id: number;
    subject: string;
  }>;
}

export const DeckList = (props: Props) => {
  return (
    <div>
      {props.viewModel?.map((d) => {
        return <p key={d.id}>{d.subject}</p>;
      })}
    </div>
  );
};
