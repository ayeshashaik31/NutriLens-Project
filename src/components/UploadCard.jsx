import { ImagePlus, Camera, X } from "lucide-react";
import { useRef, useState } from "react";
import { analyzemeal } from "../services/analyzeservice";
import { useNavigate } from "react-router-dom";

function UploadCard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      setImage(selectedImage);
      setError("");
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      setError("Please select an image first.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await analyzemeal(image);

      navigate("/result", {
        state: data,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to analyze the meal. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-8 max-w-xl px-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-center">
          {!image ? (
            <>
              <div className="mb-5 rounded-full bg-lime-400/10 p-4">
                <ImagePlus className="h-8 w-8 text-lime-400" />
              </div>

              <h2 className="text-2xl font-semibold text-white">
                Upload Your Meal
              </h2>

              <p className="mt-2 text-center text-slate-400">
                Choose a clear photo of your meal to analyze its nutrition.
              </p>
            </>
          ) : (
            <div className="relative mx-auto flex h-60 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
              <img
                src={URL.createObjectURL(image)}
                alt="Selected meal preview"
                className="max-h-full max-w-full object-contain"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-3 right-3 rounded-full bg-slate-950/80 p-2 text-slate-300 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Direct Native Trigger - Bypasses custom modal lifecycle traps on mobile */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-8 flex cursor-pointer items-center gap-2 rounded-xl bg-lime-400 px-8 py-3 font-semibold text-slate-900 transition-all hover:scale-105 hover:bg-lime-300"
          >
            <Camera className="h-5 w-5" />
            {image ? "Change Image" : "Take or Upload Photo"}
          </button>

          {image && (
            <button
              type="button"
            onClick={handleAnalyze}
              disabled={loading}
              className="mt-4 w-full rounded-xl border border-lime-400 px-6 py-3 font-semibold text-lime-400 transition-all duration-300 hover:bg-lime-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Analyzing..." : "Analyze My Meal"}
            </button>
          )}

          {error && (
            <p className="mt-4 text-center text-sm text-red-400">{error}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default UploadCard;