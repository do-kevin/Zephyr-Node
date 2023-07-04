import { Deck } from "./flashcard";

interface Props {
  viewModel: Deck[];
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
