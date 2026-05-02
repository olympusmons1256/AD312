import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const DOG_API_BASE_URL = 'https://dogapi.dog/api/v2'

const fetchJson = async (url) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

function DogQueryExplorer() {
  const [selectedBreedId, setSelectedBreedId] = useState('')

  const breedsQuery = useQuery({
    queryKey: ['dog-breeds'],
    queryFn: () => fetchJson(`${DOG_API_BASE_URL}/breeds`)
  })

  const factsQuery = useQuery({
    queryKey: ['dog-facts'],
    queryFn: () => fetchJson(`${DOG_API_BASE_URL}/facts`)
  })

  const groupsQuery = useQuery({
    queryKey: ['dog-groups'],
    queryFn: () => fetchJson(`${DOG_API_BASE_URL}/groups`)
  })

  const breeds = useMemo(() => {
    const rawBreeds = breedsQuery.data?.data ?? []
    return rawBreeds.map((breed) => ({
      id: breed.id,
      name: breed.attributes?.name ?? 'Unknown breed',
      description: breed.attributes?.description ?? 'No description available.'
    }))
  }, [breedsQuery.data])

  useEffect(() => {
    if (!selectedBreedId && breeds.length > 0) {
      setSelectedBreedId(breeds[0].id)
    }
  }, [selectedBreedId, breeds])

  const breedDetailsQuery = useQuery({
    queryKey: ['dog-breed-details', selectedBreedId],
    queryFn: () => fetchJson(`${DOG_API_BASE_URL}/breeds/${selectedBreedId}`),
    enabled: Boolean(selectedBreedId)
  })

  const selectedBreedAttributes = breedDetailsQuery.data?.data?.attributes

  const factItems = (factsQuery.data?.data ?? []).map((fact) => fact.attributes?.body ?? 'No fact text')

  const groupItems = (groupsQuery.data?.data ?? []).map((group) => ({
    id: group.id,
    name: group.attributes?.name ?? 'Unknown group',
    purpose: group.attributes?.purpose ?? group.attributes?.description ?? 'No details available.'
  }))

  return (
    <section className="dog-query-card">
      <h2>Dog API Explorer (TanStack Query)</h2>

      <div className="dog-query-section">
        <h3>Breeds (Part 1 + 2)</h3>

        {breedsQuery.isPending && <p className="status pending">Loading dog breeds...</p>}
        {breedsQuery.isError && <p className="status error">Error loading breeds: {breedsQuery.error.message}</p>}
        {breedsQuery.isSuccess && (
          <>
            <p className="status success">Loaded {breeds.length} breeds successfully.</p>

            <label className="dog-select-label">
              Choose a breed
              <select value={selectedBreedId} onChange={(event) => setSelectedBreedId(event.target.value)}>
                {breeds.map((breed) => (
                  <option key={breed.id} value={breed.id}>
                    {breed.name}
                  </option>
                ))}
              </select>
            </label>

            <ul className="dog-list">
              {breeds.slice(0, 12).map((breed) => (
                <li key={breed.id}>{breed.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="dog-query-section">
        <h3>Breed Details (Part 3)</h3>

        {breedDetailsQuery.isPending && <p className="status pending">Loading selected breed details...</p>}
        {breedDetailsQuery.isError && (
          <p className="status error">Error loading breed details: {breedDetailsQuery.error.message}</p>
        )}
        {breedDetailsQuery.isSuccess && selectedBreedAttributes && (
          <div className="details-panel">
            <p>
              <strong>Name:</strong> {selectedBreedAttributes.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedBreedAttributes.description || 'No description available.'}
            </p>
            <p>
              <strong>Life Min:</strong> {selectedBreedAttributes.life?.min ?? 'N/A'} years
            </p>
            <p>
              <strong>Life Max:</strong> {selectedBreedAttributes.life?.max ?? 'N/A'} years
            </p>
            <p>
              <strong>Male Weight:</strong> {selectedBreedAttributes.male_weight?.min ?? 'N/A'} -{' '}
              {selectedBreedAttributes.male_weight?.max ?? 'N/A'} lbs
            </p>
            <p>
              <strong>Female Weight:</strong> {selectedBreedAttributes.female_weight?.min ?? 'N/A'} -{' '}
              {selectedBreedAttributes.female_weight?.max ?? 'N/A'} lbs
            </p>
          </div>
        )}
      </div>

      <div className="dog-query-section">
        <h3>Dog Facts (Part 4)</h3>

        {factsQuery.isPending && <p className="status pending">Loading dog facts...</p>}
        {factsQuery.isError && <p className="status error">Error loading facts: {factsQuery.error.message}</p>}
        {factsQuery.isSuccess && (
          <ul className="dog-list">
            {factItems.slice(0, 6).map((factText, index) => (
              <li key={`${factText}-${index}`}>{factText}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="dog-query-section">
        <h3>Dog Groups (Part 4)</h3>

        {groupsQuery.isPending && <p className="status pending">Loading dog groups...</p>}
        {groupsQuery.isError && <p className="status error">Error loading groups: {groupsQuery.error.message}</p>}
        {groupsQuery.isSuccess && (
          <ul className="dog-list">
            {groupItems.map((group) => (
              <li key={group.id}>
                <strong>{group.name}:</strong> {group.purpose}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default DogQueryExplorer