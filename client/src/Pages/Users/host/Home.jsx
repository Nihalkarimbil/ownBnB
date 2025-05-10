import { useState } from "react";
import { useSelector } from "react-redux";
import bannerimg from "../../../assets/download.jpg";

function Home() {
  const { user } = useSelector((state) => state.User);
  const [steps] = useState([
    { id: 1, title: 'Instant Book', subtitle: 'options reviewed', completed: true },
    { id: 2, title: 'Calendar', subtitle: 'reviewed', completed: true },
    { id: 3, title: 'Cancellation', subtitle: 'policies reviewed', completed: true },
    { id: 4, title: 'House rules', subtitle: 'reviewed', completed: true },

  ]);

  return (
    <div className="min-h-screen relative">
      {/* Banner image as background */}
      

      {/* Content with proper z-index to appear above background */}
      <div className="relative z-10">
        {/* Welcome section */}
        <div className="mx-28 pt-16 w-full">
          <div className="bg-white md:max-w-md mb-6 p-4 rounded-lg bg-opacity-90">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
              Welcome, <span className="text-rose-600">{user.username}</span>!
            </h1>
            <h1 className="text-2xl md:text-lg font-medium text-gray-600 w-full">
              Guests can reserve your place 24 hours after you publish – here's how to prepare.
            </h1>
          </div>
          <div className="w-64 border-2 h-24 rounded-lg p-4 bg-white bg-opacity-90">
            <h1 className="text-sm text-orange-700">
              Confirm important details
              <br />Required to publish
            </h1>
          </div>
        </div>

        {/* Next steps section */}
        <div className="w-full mt-5 mx-auto">
          <div className="mx-16">
          <div className="mb-8 bg-white p-4 rounded-lg bg-opacity-90 inline-block">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Your next steps</h1>
            <p className="text-gray-700">It's time to review a couple of current settings.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-100"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {step.completed && (
                      <div className="bg-green-600 rounded-full p-1 h-4 w-4">
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{step.title}</h3>
                    <p className="text-gray-700">{step.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;