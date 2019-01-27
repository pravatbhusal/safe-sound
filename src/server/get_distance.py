import math


# get distance
def distance(latt1, latt2, long1, long2):
    # convert degrees to radians
    latt1 = (latt1 * (math.pi)) / 180
    long1 = (long1 * (math.pi)) / 180

    latt2 = (latt2 * (math.pi)) / 180
    long2 = (long2 * (math.pi)) / 180

    # radius of earth in meters
    r = 6378100

    # vector 1
    mag1 = r * math.cos(latt1)  # magnitude
    x1 = mag1 * math.cos(long1)
    y1 = mag1 * math.sin(long1)
    z1 = r * math.sin(latt1)

    # vector 2
    mag2 = r * math.cos(latt2)
    x2 = mag2 * math.cos(long2)
    y2 = mag2 * math.sin(long2)
    z2 = r * math.sin(latt2)

    # dot product
    dot_product = ((x1 * x2) + (y1 * y2) + (z1 * z2))

    # find theta
    cos_theta = dot_product / (r * r)
    theta = math.acos(cos_theta)

    # distance in meters
    distance = r * theta

    return distance
