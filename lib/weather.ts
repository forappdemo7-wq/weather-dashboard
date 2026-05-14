const API_KEY =
  process.env
    .NEXT_PUBLIC_OPENWEATHER_API_KEY;

const WEATHER_BASE_URL =
  'https://api.openweathermap.org/data/2.5';

/* -------------------------------- */
/* GET COORDINATES */
/* -------------------------------- */

async function getCoordinates(
  location: string
) {
  try {
    const cleanLocation =
      location.trim();

    const searchQueries = [
      `${cleanLocation}, Gujarat, India`,
      `${cleanLocation}, India`,
      cleanLocation
    ];

    for (const query of searchQueries) {
      try {
        console.log(
          'Searching:',
          query
        );

        const osmRes =
          await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              query
            )}&format=json&addressdetails=1&limit=5`,
            {
              headers: {
                'Accept-Language':
                  'en'
              },

              next: {
                revalidate: 86400
              }
            }
          );

        if (!osmRes.ok) {
          continue;
        }

        const osmData =
          await osmRes.json();

        console.log(
          'OSM Results:',
          osmData
        );

        if (
          osmData &&
          osmData.length > 0
        ) {
          const place =
            osmData.find(
              (item: any) =>
                item.display_name
                  ?.toLowerCase()
                  .includes(
                    'gujarat'
                  )
            ) || osmData[0];

          console.log(
            'Using location:',
            place.display_name
          );

          return {
            lat: parseFloat(
              place.lat
            ),

            lon: parseFloat(
              place.lon
            ),

            name:
              place.address
                ?.village ||
              place.address
                ?.town ||
              place.address
                ?.city ||
              place.address
                ?.county ||
              cleanLocation,

            state:
              place.address
                ?.state || '',

            country:
              place.address
                ?.country ||
              ''
          };
        }
      } catch (err) {
        console.log(
          'Search failed:',
          err
        );
      }
    }

    throw new Error(
      'Location not found'
    );
  } catch (err) {
    console.error(err);

    throw err;
  }
}

/* -------------------------------- */
/* CURRENT WEATHER */
/* -------------------------------- */

export async function getCurrentWeather(
  location: string
) {
  if (!API_KEY) {
    throw new Error(
      'Missing OpenWeather API key'
    );
  }

  const coords =
    await getCoordinates(
      location
    );

  const res = await fetch(
    `${WEATHER_BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`,
    {
      next: {
        revalidate: 900
      }
    }
  );

  if (!res.ok) {
    throw new Error(
      'Weather fetch failed'
    );
  }

  const weatherData =
    await res.json();

  return {
    ...weatherData,

    customLocation: {
      name: coords.name,

      state:
        coords.state,

      country:
        coords.country
    }
  };
}

/* -------------------------------- */
/* FORECAST */
/* -------------------------------- */

export async function getForecast(
  location: string
) {
  if (!API_KEY) {
    throw new Error(
      'Missing OpenWeather API key'
    );
  }

  const coords =
    await getCoordinates(
      location
    );

  const res = await fetch(
    `${WEATHER_BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`,
    {
      next: {
        revalidate: 900
      }
    }
  );

  if (!res.ok) {
    throw new Error(
      'Forecast fetch failed'
    );
  }

  return res.json();
}

/* -------------------------------- */
/* AIR QUALITY */
/* -------------------------------- */

export async function getAirQuality(
  lat: number,
  lon: number
) {
  if (!API_KEY) {
    throw new Error(
      'Missing OpenWeather API key'
    );
  }

  const res = await fetch(
    `${WEATHER_BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    {
      next: {
        revalidate: 900
      }
    }
  );

  if (!res.ok) {
    throw new Error(
      'Air quality fetch failed'
    );
  }

  return res.json();
}