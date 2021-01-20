import getRawBody from 'raw-body';
import { D_1 } from "../elements/details/d_1";
import { H_1 } from "../elements/headers/H_1";

function Template({ data }) {
  return (
    <div>
      <H_1 />
      <D_1 />
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const { req } = context
  if (req.method == "POST") {
    const body = await getRawBody(req)
    console.log(body.toString("utf-8"))
  }
  // Fetch data from external API
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();
  const data = {
    product: "Bob"
  }

  // Pass data to the page via props
  return { props: { data } };
}

export default Template;
