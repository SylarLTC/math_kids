export const countSolvedProblemsAndSetColorClass = (
  setTotalCorrects,
  itemsCorrects,
  itemsLabel,
  totalAmountOfElements,
  answer,
  checkAnswer,
  setEqualityNumbers,
  setCheckColorClass
) => {
  if (answer !== checkAnswer.toString()) {
    setEqualityNumbers(false);
    setCheckColorClass("bg-rose-500");
  } else {
    setEqualityNumbers(true);
    setCheckColorClass("bg-green-400");
    if (itemsCorrects[itemsLabel] < totalAmountOfElements) {
      setTotalCorrects({
        ...itemsCorrects,
        [itemsLabel]: itemsCorrects[itemsLabel] + 1,
      });
    }
  }
};
