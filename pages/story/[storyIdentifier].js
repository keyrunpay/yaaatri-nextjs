import Head from "next/head";
import { fixLink } from "../../src/core/helpers/file_helper";
import Story from "../../src/features/Story/Story";
import { onReadOneStorySSR } from "../../src/services/story.service";

const page = (props) => (
  <>
    <Head>
      <title>{props?.title || "Travelers Nepal"}</title>
      <meta
        property="og:type"
        content="Exploring the nepals destinations and stories"
      />
      <meta property="og:title" content={props?.title} />
      <meta property="og:description" content={props?.sub_title} />
      <meta
        property="og:image"
        content={fixLink(props?.thumb_image) || fixLink(props?.cover_image)}
      />
    </Head>
    <Story {...props} />
  </>
);

export async function getServerSideProps({ query }) {
  const { storyIdentifier } = query;
  let payload = { storyIdentifier };
  try {
    const res = await onReadOneStorySSR(storyIdentifier);
    console.log(res);
    payload = {
      ...payload,
      ...res,
    };
  } catch (err) {
    payload = {
      ...payload,
      error: err,
    };

    console.log(err);
  }
  return {
    props: payload,
  };
}

export default page;
