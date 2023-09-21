import { FallingLines } from 'react-loader-spinner';
export default function Loader() {
  return (
    <FallingLines
      color="#4fa94d"
      width="400"
      visible={true}
      ariaLabel="falling-lines-loading"
    />
  );
}
