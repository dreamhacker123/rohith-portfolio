
import { useTheme } from "../api-handlers/themeContext"

export const PhotoBanner = () => {
  const theme = useTheme()
  const imageUrl = "/my_profile_photo.jpg"

  return (
    <div className="h-auto flex items-center justify-center mb-6">
      <div
        className={`w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full border-4 border-red-500 shadow-2xl shadow-red-500/50 overflow-hidden ${theme.text} flex items-center justify-center ring-4 ring-red-500/30 transition-all duration-300 hover:scale-105 hover:ring-red-500/60 hover:shadow-red-500/70"`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Photo of Rohith Satya Nivas Muchakarla"
            className={`h-full aspect-square object-cover ${theme.photoFilter}`}
            />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm">
            Loading...
          </div>
        )}
      </div>
    </div>
  )
}
export default PhotoBanner