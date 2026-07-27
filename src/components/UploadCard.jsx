import { ImagePlus, Camera, Images, X } from "lucide-react";
import { useRef, useState } from "react";
import { analyzemeal } from "../services/analyzeservice";
import { useNavigate } from "react-router-dom";

function UploadCard() {
  const navigate = useNavigate();

  const galleryInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showImageOptions, setShowImageOptions] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files?.[0];

    if (selectedImage) {
      setImage(selectedImage);
      setError("");
    }
    setShowImageOptions(false);
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
    } catch (error) {
      setError(
        error.response?.data?.message ||
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
            <div className="mx-auto flex h-60 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
              <img
                src={URL.createObjectURL(image)}
                alt="Selected meal preview"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowImageOptions(true)}
            className="mt-8 cursor-pointer rounded-xl bg-lime-400 px-8 py-3 font-semibold text-slate-900 transition-all hover:scale-105 hover:bg-lime-300"
          >
            {image ? "Change Image" : "Choose Image"}
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

      {showImageOptions && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-4 pb-6 sm:items-center">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Choose Image Source
              </h3>

              <button
                type="button"
                onClick={() => setShowImageOptions(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Native Label Wrapper for Camera - Bypasses mobile ref lifecycle issues */}
            <label className="flex w-full cursor-pointer items-center gap-3 rounded-xl bg-lime-400 px-4 py-3 font-semibold text-slate-950 transition-all hover:bg-lime-300">
              <Camera className="h-5 w-5" />
              Take Photo
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="mt-3 flex w-full items-center gap-3 rounded-xl border border-lime-400 px-4 py-3 font-semibold text-lime-400 transition-all hover:bg-white/5"
            >
              <Images className="h-5 w-5" />
              Choose from Gallery
            </button>

            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => setShowImageOptions(false)}
              className="mt-3 w-full rounded-xl px-4 py-3 font-semibold text-slate-400 hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default UploadCard;