import { observer } from "mobx-react";

interface Props {
  presenter: any;
}

export const DeckList = observer((props: Props) => {
  return (
    <div>
      {props.presenter.decks?.map((d: any) => {
        return <p key={d.id}>{d.subject}</p>;
      })}
    </div>
  );
});
