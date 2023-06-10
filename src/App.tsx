import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import { toPng } from 'html-to-image';

function App() {
  const [value, setValue] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const ref = useRef<HTMLImageElement>(null)

  const handleChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((e) => {
    const val = e.target.value
    setValue(val)
  }, [])

  const table = useMemo(() => {
    if (value.length === 0) return null
    const rows = value.split('\n')
    console.log(rows)
    return (
      <table>
        <tbody className="bg-white">
          {rows.map((v, vi) => {
            const cells = v.split('\t');
            console.log('cells', cells)
            return (<tr className="even:bg-gray-50" key={`${vi}-${v}`}>
              {cells.map((c, ci) => (
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" key={`${ci}-${c}`}>{c}</td>
              ))}
            </tr>)
          })}
        </tbody>
      </table>
    )
  }, [value])

  useEffect(() => {
    if (ref.current !== null) {
      toPng(ref.current, { cacheBust: true, })
        .then((dataUrl) => {
          setImageUrl(dataUrl)
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }
  }, [table])

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">

              {table && imageUrl && (
                <div className="my-4 mx-auto">
                  <img src={imageUrl} />
                </div>
              )}

              <h2 className="text-base font-semibold leading-7 text-gray-900">Table to Image</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Paste the table below to create an image.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      onChange={handleChange}
                      rows={8}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>


          {table && <div ref={ref} className="bg-white">
            <div className="p-4">
              <h2>Size Chart</h2>
              {table && table}
            </div>
          </div>}

        </form>
      </div>
    </div>
  )
}

export default App
