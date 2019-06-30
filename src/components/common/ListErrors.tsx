import React from 'react';
import { IErrors } from '../../types';

export default function ListErrors({ errors }: { errors: IErrors }) {
  return (
    <ul className="error-messages">
      {Object.entries(errors).map(([key, keyErrors]) =>
        keyErrors.map((error) => (
          <li>
            {key} {error}
          </li>
        )),
      )}
    </ul>
  );
}
