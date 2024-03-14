import type { View, ViewType } from '@/types/index';
import ListView from './ListView';
import TableView from './TableView';
import TextView from './TextView';

const views: Record<ViewType, any> = {
  LIST: ListView,
  NONE: null,
  TABLE: TableView,
  TEXT: TextView,
};

const ViewMapper = ({ view }: { view: View }) => {
  const View = views[view.viewType!];
  return View ? <View {...view} /> : null;
};

export const renderView = (view: View) => <ViewMapper view={view} />;
