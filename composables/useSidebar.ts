export const gUseExpanded = useState<boolean>("expanded", () => false);
export const gUseActiveView = useState<ActiveView>(
  "activeView",
  () => ActiveView.None,
);
