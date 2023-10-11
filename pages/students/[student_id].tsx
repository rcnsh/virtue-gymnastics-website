import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LineBreaks from '@/components/line-breaks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { students } from '@prisma/client';

const BookingDetailsPage = () => {
  const router = useRouter();
  const { student_id } = router.query;
  const [studentData, setStudentData] = useState<students | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const deleteStudent = async () => {
    try {
      const result = await fetch(
        `/api/delete/deleteStudent?student_id=${student_id}`,
      );
      if (result.ok) {
        fetchStudentData().catch((error) => {
          console.error('Error fetching students data:', error);
        });
        router.push('/students').catch((error) => {
          console.error('Error navigating to students page:', error);
        });
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const fetchStudentData = async () => {
    try {
      const data = await fetch(
        `/api/fetch/getStudentFromStudentID?student_id=${student_id}`,
      );
      const data_json = await data.json();
      setStudentData(data_json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (student_id) {
      fetchStudentData().catch((error) => {
        console.error('Error fetching students data:', error);
      });
    }
  }, [student_id]);

  if (!studentData) {
    return (
      <>
        <LineBreaks />
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50 flex justify-center">
          Loading...
        </h1>
        <LineBreaks />
      </>
    );
  }

  return (
    <>
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-lg font-semibold">
          Student Details: {studentData.student_first_name}{' '}
          {studentData.student_last_name}
        </h2>
        <br />
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <p className="font-semibold">Parent Information:</p>
            <p>
              Name: {studentData.parent_first_name}{' '}
              {studentData.parent_last_name}
            </p>
            <p>Home Phone: {studentData.home_phone || 'N/A'}</p>
            <p>Work Phone: {studentData.work_phone || 'N/A'}</p>
            <p>Mobile Phone 1: {studentData.mobile_phone1}</p>
            <p>Mobile Phone 2: {studentData.mobile_phone2 || 'N/A'}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Student Information:</p>
            <p>
              Name: {studentData.student_first_name}{' '}
              {studentData.student_last_name}
            </p>
            <p>
              Date of Birth:{' '}
              {studentData.student_dob
                ? new Date(studentData.student_dob).toLocaleDateString('en-GB')
                : 'N/A'}
            </p>
            <p>Gender: {studentData.student_gender}</p>
            <p>
              Medical Conditions:{' '}
              {studentData.student_medical_conditions.join(', ') || 'N/A'}
            </p>
            <p>
              Additional Info: {studentData.student_additional_info || 'N/A'}
            </p>
            <p>
              Preferred Days:{' '}
              {studentData.student_preferred_days.join(', ') || 'N/A'}
            </p>
          </div>
        </div>
        <div>
          <p className="font-semibold">Consents:</p>
          <p>
            Photo Consent: {studentData.student_photo_consent ? 'Yes' : 'No'}
          </p>
          <p>
            Video Consent: {studentData.student_video_consent ? 'Yes' : 'No'}
          </p>
          <p>
            Walking Home Consent:{' '}
            {studentData.student_walking_home_consent ? 'Yes' : 'No'}
          </p>
        </div>
        <div>
          <p className="font-semibold">Contact Information:</p>
          <p>Address 1: {studentData.address1}</p>
          <p>Address 2: {studentData.address2 || 'N/A'}</p>
          <p>City: {studentData.city}</p>
          <p>County: {studentData.county}</p>
          <p>Postcode: {studentData.postcode}</p>
          <p>Hear About Us: {studentData.hear_about_us}</p>
        </div>
      </div>
      <div className={'flex justify-evenly'}>
        <Link href={'/students'}>
          <Button variant={'default'}>Back</Button>
        </Link>
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogTrigger>
            <Button variant={'destructive'}>Deregister Student</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to deregister this student?
              </DialogTitle>
              <DialogDescription>
                This will also remove all bookings associated with this student.
              </DialogDescription>
            </DialogHeader>
            <Button
              variant={'destructive'}
              onClick={() => {
                deleteStudent().catch((error) => {
                  console.error('Error deleting student:', error);
                });
                setDeleteDialogOpen(false);
              }}
            >
              Deregister
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default BookingDetailsPage;
