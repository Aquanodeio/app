// import React from "react";
// import { examples } from "@/components/list";
// import Link from "next/link";

// const Examples = () => {
//   return (
//     <section className="min-h-screen bg-background text-foreground py-6 sm:py-12">
//       <div className="max-w-6xl mx-auto px-0 sm:px-6">
//         <div className="px-4 sm:px-0">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
//             Deployment Examples
//           </h1>
//           <p className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-12 max-w-3xl">
//             Browse ready-to-use templates and launch in seconds, no setup
//             needed.
//           </p>
//         </div>
//         <div className="px-4 sm:px-0">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//             {examples.map((example, index) => (
//               <Link href={example.url(example.id)} className="block group" key={index}>
//                 <div className="dashboard-card subtle-glow">
//                   <div className="flex flex-col h-full">
//                     <h3 className="text-base sm:text-lg font-semibold mb-1.5 transition-colors duration-300">
//                       {example.name}
//                     </h3>
//                     <p className="text-xs sm:text-sm text-muted-foreground">
//                       {example.description}
//                     </p>
//                     <div className="mt-3 text-right">
//                       <span className="text-xs sm:text-sm text-white font-medium group-hover:translate-x-1 inline-flex transition-transform duration-300">
//                         Use template →
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Examples;
