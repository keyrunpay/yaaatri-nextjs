import Head from "next/head";
import { fixLink } from "../../src/core/helpers/file_helper";
import Destination from "../../src/features/Destination/Destination";
import { onReadOneDestinationSSR } from "../../src/services/destination.service";

const page = (props) => (
  <>
    <Head>
      <title>{props?.name || "Yaaatri"}</title>
      <meta
        property="og:type"
        content="Exploring the nepals destinations and stories"
      />
      <meta property="og:title" content={props?.name} />
      <meta property="og:description" content={props?.name + " | Yaaatri"} />
      <meta
        property="og:image"
        content={fixLink(props?.thumb_image) || fixLink(props?.cover_images[0])}
      />
    </Head>
    <Destination content={props} />
  </>
);

export async function getServerSideProps({ query }) {
  const { identifier } = query;
  let payload = { identifier };
  try {
    const res = await onReadOneDestinationSSR(identifier);
    payload = {
      ...payload,
      ...res,
    };
  } catch (err) {
    payload = {
      ...payload,
      error: err,
    };
    console.log("Error fetching", err);
  }
  return {
    props: payload,
  };
}

export default page;
