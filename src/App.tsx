import TestimonialsSlider from "./components/testimonialsSlider";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('C:\Projects\test-task\fon.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <TestimonialsSlider />
    </div>
  );
}


