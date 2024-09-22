import { useActionState } from "react";
import "./App.css";
import { useFormStatus } from "react-dom";

const mockApi = (
  value: string
): Promise<{
  val: string;
  success: boolean;
}> =>
  new Promise((resolve, reject) => {
    const message = {
      success: false,
      val: "There is an error",
    };
    setTimeout(() => {
      if (Math.round(Math.random())) {
        message.val = value;
        message.success = true;
        resolve(message);
      } else {
        resolve(message);
      }
    }, 1000);
  });

const Loader = () => {
  const { pending, data } = useFormStatus();
  return <>{pending ? `Loading for ${data?.get("message")}...` : "Click me button"}</>;
};

function App() {
  const [error, formAction, isPending] = useActionState(async (_prevState: any, formData: any) => {
    const value = formData.get("message");
    const res = await mockApi(value);
    if (!res.success) {
      return res.val;
    } else {
      return "";
    }
  }, "");

  return (
    <>
      <h1>React 19 form</h1>
      <form action={formAction}>
        <input
          name='message'
          placeholder='Type here...'
        />
        {error && <p>{error}</p>}
        <button
          type='submit'
          disabled={isPending}>
          <Loader />
        </button>
      </form>
    </>
  );
}

export default App;
