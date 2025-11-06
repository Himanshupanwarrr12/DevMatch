const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-pink-600 text-base-content p-4">
      <aside>
        <p className="text-white text-lg">
          Copyright © {new Date().getFullYear()} - All right reserved by DevMatch
        </p>
      </aside>
    </footer>
  )
}

export default Footer