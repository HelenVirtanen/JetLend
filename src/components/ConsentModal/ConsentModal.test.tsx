import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ConsentModal from "./ConsentModal";

describe("ConsentModal", () => {
  it("не рендерится если isOpen=false", () => {
    render(
      <ConsentModal
        isOpen={false}
        countdown={5}
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );

    expect(screen.queryByText("Согласие с правилами")).toBeNull();
  });

  it("отображается при isOpen=true", () => {
    render(
      <ConsentModal
        isOpen={true}
        countdown={5}
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );

    expect(screen.getByText("Согласие с правилами")).toBeInTheDocument();
  });

  it("кнопка подтверждения заблокирована при countdown > 0", () => {
    render(
      <ConsentModal
        isOpen={true}
        countdown={5}
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );

    const btn = screen.getByRole("button", { name: /Подтвердить/i });
    expect(btn).toBeDisabled();
  });

  it("кнопка активна при countdown = 0", () => {
    render(
      <ConsentModal
        isOpen={true}
        countdown={0}
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );

    const btn = screen.getByText("Подтвердить");
    expect(btn).not.toBeDisabled();
  });

  it("вызывает onClose при клике на Отмена", () => {
    const onClose = vi.fn();

    render(
      <ConsentModal
        isOpen={true}
        countdown={0}
        onClose={onClose}
        onConfirm={() => {}}
      />
    );

    fireEvent.click(screen.getByText("Отмена"));
    expect(onClose).toHaveBeenCalled();
  });

  it("вызывает onConfirm при клике Подтвердить", () => {
    const onConfirm = vi.fn();

    render(
      <ConsentModal
        isOpen={true}
        countdown={0}
        onClose={() => {}}
        onConfirm={onConfirm}
      />
    );

    fireEvent.click(screen.getByText("Подтвердить"));
    expect(onConfirm).toHaveBeenCalled();
  });
});