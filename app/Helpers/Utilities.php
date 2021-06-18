<?php

namespace App\Helpers;

class Utilities
{
    public static function getMonth(int $month) {
        switch ($month) {
            case 1: return 'Januari';
            case 2: return 'Februari';
            case 3: return 'Maret';
            case 4: return 'April';
            case 5: return 'Mei';
            case 6: return 'Juni';
            case 7: return 'Juli';
            case 8: return 'Agustus';
            case 9: return 'September';
            case 10: return 'Oktober';
            case 11: return 'November';
            case 12: return 'Desember';
            default: return null;
        }
    }

    public static function filterDataPerMonth($arr_data, string $value_key = "tanggal", int $how_many_month_before = 4, int $month_start = null) {
        $datas = [];
        if (is_null($month_start)) {
            $month_start = date('m');
        }

        for ($i = $how_many_month_before; $i >= 0 ; $i--) {
            $month_check = $month_start - $i;

            $year_check = date('Y');
            if ($month_check <= 0) {
                $year_check--;
                $month_check = $month_check + 12;
            }

            array_push($datas, [
                "name" => Utilities::getMonth($month_check) . " {$year_check}",
                "value" => count(array_filter($arr_data, function ($key) use ($month_check, $year_check, $value_key) {
                    return $year_check == date('Y', strtotime($key[$value_key])) && $month_check == date('m', strtotime($key[$value_key]));
                }))
            ]);
        }

        return $datas;
    }
}
