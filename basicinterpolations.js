function LinearInterp(fromX, toX, fromY, toY, x) //clamps output if x is not between fromX and toX. fromX must be less than toX.
{

  if (x <= fromX)
  {
    return fromY;
  }

  if (x >= toX)
  {
    return toY;
  }

  let m = (toY - fromY) / (toX - fromX);
  return m * (x - fromX) + fromY;

}//LinearInterp

function SigmoidInterp(fromX, toX, fromY, toY, x) //clamps output if x is not between fromX and toX. fromX must be less than toX.
{

  if (x <= fromX)
  {
    return fromY;
  }

  if (x >= toX)
  {
    return toY;
  }

  return (toY - fromY) / (1 + Math.exp( -12 * (x - fromX) / (toX - fromX) + 6) );

}//SigmoidInterp