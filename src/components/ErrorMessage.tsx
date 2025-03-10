interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className='mb-4 text-center text-red-600'>{message}</div>;
}
