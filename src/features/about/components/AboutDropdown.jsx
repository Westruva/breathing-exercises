// Native <details> gives a drop-down that opens on click with no JavaScript,
// and works with the keyboard and screen readers.
export default function AboutDropdown() {
  return (
    <details className="about">
      <summary>Why the app was made</summary>
      <div className="about-text">
        <p>
          After I quit alcohol, I was forced to find another way to relieve stress. As we all know, it is
          inevitable. When I ventured into diaphragmatic breathing, it changed my life. I have never been more
          addicted to breathing.
        </p>
        <p>
          It isn&rsquo;t a fix-all, but it&rsquo;s a very handy tool when you are feeling low, bored or anxious.
        </p>
      </div>
    </details>
  )
}
