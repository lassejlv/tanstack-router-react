import { ClipLoader } from 'react-spinners';

export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ClipLoader color="#000" />
    </div>
  );
}
