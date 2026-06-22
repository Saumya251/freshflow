import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Loader,
  showToast,
  ToastContainer,
} from "../components/ui";

function ComponentDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div style={{ padding: "30px" }}>
      <h1>UI Components Demo</h1>

      <h2>Button</h2>
      <Button variant="primary">Primary</Button>

      <h2>Input</h2>
      <Input
        label="Name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <h2>Modal</h2>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Demo Modal"
      >
        <p>Hello from Modal</p>
      </Modal>

      <h2>Toast</h2>
      <Button onClick={() => showToast("Toast Working!")}>
        Show Toast
      </Button>

      <ToastContainer />

      <h2>Loader</h2>
      <Loader />
    </div>
  );
}

export default ComponentDemo;