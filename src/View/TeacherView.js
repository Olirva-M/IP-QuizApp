import React from 'react';

export default function TeacherView({ Students }) {
    return (
        <div>
            <table style={{ border: '1px solid black' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {Students.map((student, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{student.name}</td>
                            <td style={{ border: '1px solid black', padding: '8px', color: student.score < 5 ? 'red' : 'green' }}>
                                {student.score}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
