import axios from "axios";
const ApiFunc = async (domain) => {
  const favPok = "abra";
  try {
    const { data } = await axios(
      `https://hw.arpeely.ai/domain/info?domain=${domain}`,
      { method: "GET", headers: { "X-Best-Pokemon": favPok } }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
export default ApiFunc;
