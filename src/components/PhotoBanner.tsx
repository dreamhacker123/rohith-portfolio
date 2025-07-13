
import { useTheme } from "../api-handlers/themeContext"

export const PhotoBanner = () => {
  const theme = useTheme()
  const imageUrl = "https://res.cloudinary.com/dqsxhtkyo/image/upload/v1752396946/WhatsApp_Image_2025-07-13_at_2.24.06_PM_sgdvhu.jpg"

  return (
    <div className={ `h-90 flex items-center justify-center mb-3`}>
      <div
        className={`rounded-full border-b-white border-4 overflow-hidden shadow-md ${theme.text} flex items-center justify-center`}
        style={{
          width: "300px",
          height: "300px",
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Banner"
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