import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const features = [
  {
    name: "☁️ Cloud IPFS Storage",
    description: "IPFS content pinning requires the content to be hosted on local node, let us do that for you.",
  },
  {
    name: "💰 DePin Infrastructure",
    description:
      "We utilize resource providers computing for our services and incentivize them per computing resource used.",
  },
  {
    name: "🤝 Smart Contract Audit",
    description:
      "Public library of known smart contract vulnerabilities are periodically added to our dictionary, and suggestions by AI.",
  },
  {
    name: "⚡ Public IPFS Gateway",
    description:
      "We provide public IPFS gateway to enable a broad range of applications to interface with IPFS using HTTP.",
  },
];

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const _user = JSON.parse(
      localStorage.getItem("ming_authenticated_user") || "{}"
    );
    if (_user.email) return navigate("/dashboard");
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl gap-x-8 gap-y-8 px-4 py-2 sm:px-6 sm:py-8 lg:max-w-7xl flex flex-col xl:flex-row items-center">
        <div className="flex-1">
          <div>
            <img
              alt="Ming"
              width={100}
              height={20}
              className="mb-4"
              src="https://ik.imagekit.io/lexy/Ming/Screenshot%202024-08-22%20174630.png?updatedAt=1724363207670"
            />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Dev Tools to build on-chain applications. 
            </h2>
          </div>
          <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-y-7 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-2">
                <dt className="font-semibold text-gray-900">{feature.name}</dt>
                <dd className="mt-1 text-sm text-gray-500 ml-6">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-gray-700">
            Ready to get started? 😎 <Link className="underline text-[#2ecc71]" to="/login">if the answer is yes!</Link>
          </p>
        </div>
        <div className="flex-1">
          <img
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            src="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-[100%] h-[35em] object-cover md:w-[100vw]"
          />
        </div>
      </div>
    </div>
  );
}
