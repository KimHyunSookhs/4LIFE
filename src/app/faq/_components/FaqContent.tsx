/**
 * [FAQ] — 자주 묻는 질문
 * - 접이식 UI(Accordion)로 확장할 수 있다. Flutter의 `ExpansionTile` 느낌.
 */

export function FaqContent() {
  return (
    <section className="mx-auto w-full max-w-3xl" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-2xl font-semibold tracking-tight text-deep-blue sm:text-3xl"
      >
        FAQ
      </h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        배송, 반품, 복용 방법 등 자주 묻는 질문과 답변을 이 페이지에
        정리해 두면 고객 문의 부담을 줄일 수 있습니다.
      </p>
    </section>
  );
}
