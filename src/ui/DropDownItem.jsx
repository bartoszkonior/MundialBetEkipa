function DropDownItem({ num, date, curOpen, onOpen, children }) {
  const isOpen = num === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return <div></div>;
}

export default DropDownItem;
