/**
 * [문의하기] — 연락/폼 영역
 * - `TextField`+`ElevatedButton`로 폼을 만들듯, 추후 `form`+유효성 검사+API로 확장.
 */

export function ContactContent() {
  return (
    <section
      className="mx-auto w-full max-w-xl"
      aria-labelledby="contact-heading"
    >
      <h2
        id="contact-heading"
        className="text-2xl font-semibold tracking-tight text-deep-blue sm:text-3xl"
      >
        문의하기
      </h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        전화, 카카오, 이메일 또는 아래에 문의 폼(추가 예정)을 통해
        상담을 요청하실 수 있습니다.
      </p>
    </section>
  );
}
