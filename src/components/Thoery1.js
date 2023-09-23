import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Multi from './Multi';
import Navbar from './Navbar';
import Region from './Region';
import Swal from 'sweetalert2';
import Linechart from './Linechart';
import NumberLine from './NumberLine';
import NumRegion from './NumRegion';

function Workbench() {
  const [step, setStep] = useState(1);
  const [answerCorrect, setAnswerCorrect] = useState(false);

  const handleNext = async () => {
    if (step === 4) {
      if (answerCorrect) {
        await showMultiStepAlert();
      } else {
        alert('Please provide a correct answer before proceeding.');
      }
    } else if (step === 5) {
      if (answerCorrect) {
        await showRegionStepAlert();
      } else {
        alert('Please provide a correct answer before proceeding.');
      }
    } else {
      setStep(step + 1);
    }
  };

  const showMultiStepAlert = async () => {
    await Swal.fire({
      title: 'Arbitrary Point Step',
      text: 'Add your arbitrary point instructions here...',
      icon: 'info',
      confirmButtonText: 'Okay'
    });

    setAnswerCorrect(true);
    setStep(5);
  };

  const showRegionStepAlert = async () => {
    await Swal.fire({
      title: 'Region Step',
      text: 'This is the next region alert.',
      icon: 'info',
      confirmButtonText: 'Okay'

    });
    if (answerCorrect) {
      setStep(5);
    } else {
      alert('Please provide a correct answer before proceeding.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Linechart onNext={handleNext} />;
      case 2:
        return <NumberLine />;
      case 3:
        return <NumRegion />;
      case 4:
        return <Multi setAnswerCorrect={setAnswerCorrect} />;
      case 5:
        return <Region setAnswerCorrect={setAnswerCorrect} handleNext={handleNext} />;
      case 6:
        return <Linechart />
      default:
        return <Multi setAnswerCorrect={setAnswerCorrect} />;

    }
  };
  const nextStep = () => {
    setStep(step + 1);
  };
  return (
    <div className="min-h-screen p-10 justify-center">
      <h1 className="text-4xl font-bold mb-4 justify-center text-align-bottom-center">INEQUATIONS IN TWO VARIABLES</h1>
      <Navbar />
      <div className="bg-gray-200 rounded-lg flex flex-col h-2/3  items-center justify-center">
        <div>
          {/* {step === 1 && <Linechart />}
          {step === 2 && <NumberLine />}
          {step === 3 && <NumRegion />} */}
          {/* {step === 4 && <Multi setAnswerCorrect={setAnswerCorrect} />}
          {step === 5 && <Region setAnswerCorrect={setAnswerCorrect} handleNext={handleNext} />} */}

        </div>



        {renderStep()}
        {(step === 1 || step === 2 || step === 3) &&
          <div>
            <button type="button" class="btn btn-primary m-2 " onClick={nextStep}>Next</button>
          </div>
        }
        {(step === 4 || step === 5) &&
          <button type="button" class="btn btn-primary m-2 " onClick={handleNext}>Next</button>

        }
      </div>
    </div>
  );
}

export default Workbench;

