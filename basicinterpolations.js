function LinearInterp(x_from, x_to, y_from, y_to, x)
{
    //Throw an exception is x is out of provided bounds. Necessary as an alternate exit point since an error
    //code like -1 is also a potential valid output.
    //But is it necessary that the interpolated point be between two arbitrary points on a line?
    //if(x > Math.max(x_from, x_to) || x < Math.min(x_from, x_to)
    //{
    //    throw "x is out of provided bounds";
    //}//if x is OOB

    m = (y_to - y_from) / (x_to - x_from);

    return y_from + m * ( (x - x_from) / (x_to - x_from));

}//LinearInterp

function SigmoidInterp(x_from, x_to, y_from, y_to, x, sharpness_coefficient = 12)
{
    //if(x > Math.max(x_from, x_to) || x < Math.min(x_from, x_to)
    //{
    //    throw "x is out of provided bounds"; //is this necessary since a Sigmoid goes on forever?
    //}//if x is OOB

    if (x_from > x_to) //swap values if x_from is greater than x_to
    {
        x_from = x_from ^ x_to;
        x_to   = x_from ^ x_to;
        x_from = x_from ^ x_to;
    }

    return (y_to - y_from) / (1 + Math.exp(-sharpness_coefficient * ((x - x_from) - 0.5 * (x_to - x_from)))) + y_from;

}//SigmoidInterp
