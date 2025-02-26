export default function Error({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg bg-red-200 p-3 text-center text-sm font-bold uppercase text-red-600">
      {children}
    </p>
  );
}
