import { useEffect } from "react";
import { DeckPresenter } from "./DeckPresenter";
import { observer } from "mobx-react";
import { withInjection } from "src/react-ui/providers/withInjection";
import { DeckList } from "./DeckList";

interface Props {
  presenter: InstanceType<typeof DeckPresenter>;
}

const component = observer((props: Props) => {
  const { presenter } = props;

  useEffect(() => {
    const list = async () => {
      await presenter.list();
    };

    list();
  }, [presenter]);

  return (
    <div>
      <div>Search bar here</div>
      <main>
        <DeckList presenter={presenter} />
      </main>
    </div>
  );
});

export const DiscoverFlashcardPage = withInjection({
  presenter: DeckPresenter,
})(component);
