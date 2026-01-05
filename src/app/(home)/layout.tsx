
export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <main className="*:mx-auto *:mx-w-(--fd-layout-width)">
      {children}
    </main>
  )
}
