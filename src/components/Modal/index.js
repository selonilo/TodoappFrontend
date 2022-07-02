import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export default function Modal(props) {
  const { visible, onHide, footer, children, header, onPress, label } = props;

  const _footer = () => {
    return (
      <div className="py-2">
        <Button label="Vazgeç" icon="pi pi-times" onClick={onHide} className="p-button-text" />
        <Button label={label} icon="pi pi-check" onClick={onPress} />
      </div>
    );
  };

  return (
    <Dialog header={header} visible={visible} onHide={onHide} breakpoints={{ "960px": "75vw" }} style={{ width: "25vw" }} footer={footer ? footer : _footer}>
      {children}
    </Dialog>
  );
}

Modal.defaultProps = {
  label: "Onayla",
};
