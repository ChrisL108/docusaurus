import React, { useState } from 'react';
// import Button from '@dev-center/shared/src/components/Button';
// import Text from '@dev-center/shared/src/components/Text';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

function Feedback() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-fit">
      <p>{clicked ? 'Thank you for your feedback' : 'Was this page helpful?'}</p>
      {clicked ? (
        <div className="flex justify-center">
          <CheckCircleIcon className="h-16 w-16" />
        </div>
      ) : (
        <div className="flex gap-6">
          <button
            onClick={() => {
              setClicked(true);
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setClicked(true);
            }}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}

export default Feedback;

// import React, { useState } from 'react';
// import Button from '@dev-center/shared/src/components/Button';
// import Text from '@dev-center/shared/src/components/Text';
// import { CheckCircleIcon } from '@heroicons/react/24/outline';

// function Feedback() {
//   const [clicked, setClicked] = useState(false);

//   return (
//     <div className="flex flex-col gap-4 w-fit">
//       <Text component="div" size="xl">{clicked ? 'Thank you for your feedback' : 'Was this page helpful?'}</Text>
//       {clicked ? (
//         <div className="flex justify-center">
//           <CheckCircleIcon className="h-16 w-16" />
//         </div>
//       ) : (
//         <div className="flex gap-6">
//           <Button
//             variant="white"
//             size="lg"
//             componentClassName="text-xl font-normal w-20"
//             onClick={() => {
//               setClicked(true);
//             }}
//           >
//             Yes
//           </Button>
//           <Button
//             variant="white"
//             size="lg"
//             componentClassName="text-xl font-normal w-20"
//             onClick={() => {
//               setClicked(true);
//             }}
//           >
//             No
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Feedback;
