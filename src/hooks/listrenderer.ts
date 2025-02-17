interface ListRendererProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function ListRenderer<T extends {}>({ items, renderItem }: ListRendererProps<T>) {
  return useListRenderer(items, renderItem);
}

export function useListRenderer<T extends {}>(items: T[], renderItem: (item: T, index: number) => React.ReactNode) {
  return items.map((item, index) => renderItem(item, index));
}
