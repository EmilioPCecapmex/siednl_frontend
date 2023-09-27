import { useEffect } from "react";
import './Iframe.css';

export const IFrame = ({
  baseURL,
  source,
}: {
  source: string;
  baseURL: string;
}) => {

  useEffect(() => {
    // getToken();
  }, []);

  if (!source) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="contenedor">
      <iframe
        className="iframe"
        src={String(baseURL) + String(source)}
        title="Embedded PDF"
      ></iframe>
    </div>
    </>
  );
};

export default IFrame;
